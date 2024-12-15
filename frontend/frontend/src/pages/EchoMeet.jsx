import React, { useEffect, useRef, useState } from 'react'
import '../styles/EchoMeet.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import io from 'socket.io-client';


const server_url="http://localhost:8000"
var connections={}


const peerConfigConnections={
    "iceServers":[
        {"urls":"stun:stun.l.google.com:19302"}
    ]
}
export default function EchoMeet() {
    var socketRef=useRef()
    let socketIdRef=useRef()

    let localVideoRef=useRef()


    //check if hardware wise video is available or not ask for permission
    let [videoAvailable,setVideoAvailable]=useState(true)
    let[audioAvailable,setAudioAvailable]=useState(true)

    //manual controls of audio and video
    let[video,setvideo]=useState([])
    let [audio,setAudio]=useState()
    let[screen,setScreen]=useState()

    //handle the popup controls
    let[showModel,setShowModel]=useState(true)

    let[screenAvailable,setScreenAvailable]=useState()

    let[messages,setMessages]=useState([])
    let[message,setMessage]=useState("")
    let[newMessages,setNewMessages]=useState(2)


    let[askUsername,setAskUsername]=useState(true)

    let[username,setUsername]=useState("")

    const videoRef=useRef([])

    let[videos,setVideos]=useState([])


    const getPermissions=async()=>{
        try{
            const videoPermissions=await navigator.mediaDevices.getUserMedia({video:true})
            if(videoPermissions){
                setVideoAvailable(true)
                console.log('video allowed');
                
            }
            else{
                setVideoAvailable(false)
                console.log('video denied');
                
            }

            const audioPermissions=await navigator.mediaDevices.getUserMedia({audio:true})
            if(audioPermissions){
                setAudioAvailable(true)
                console.log('audio allowed');
                
            }
            else{
                setAudioAvailable(false)
                console.log('audio denied');
                
            }

            if(navigator.mediaDevices.getDisplayMedia){
                setScreenAvailable(true)
            }
            else{
                setScreenAvailable(false)
            }


            if(audioAvailable||videoAvailable){
                const userMediaStream=await navigator.mediaDevices.getUserMedia({video:videoAvailable,audio:audioAvailable  })

                if(userMediaStream){
                    window.localStream=userMediaStream
                    if(localVideoRef.current){
                        localVideoRef.current.srcObject=userMediaStream
                    }
                }
            }
        }catch(err){
            console.log(err);
            
        }
    }

    useEffect(()=>{
        getPermissions()

    },[])

    let getUserMediaSuccess=(stream)=>{
        try{
            window.localStream.getTracks().forEach(track=>track.stop())
        }
        catch(e){
            console.log(e);
            
        }

        window.localStream=stream
        localVideoRef.current.srcObject=stream

        for(let id in connections){
            if(id===socketIdRef.current) continue

            connections[id].addStream(window.localStream)
            connections[id].createOffer().then((description)=>{
                connections[id].setLocalDescription(description)
                .then(()=>{
                    socketIdRef.current.emit("signal",JSON.stringify({"sdp":connections[id].LocalDescription}))
                })
                .catch(e=>console.log(e))
            })
        }

        stream.getTracks().forEach(track=>track.onended=()=>{
            setvideo(false)
            setAudio(false)


            try{
                let tracks=localVideoRef.current.srcObject.getTracks()
                tracks.forEach(track=>track.stop())
            }
            catch(e){
                console.log(e);
                
            }

            let blacksilence=(...args)=>{
                new MediaStream([black(...args),silence()])

            }
            window.localStream=blacksilence()
            localVideoRef.current.srcObject=window.localStream


            for(let id in connections){
                connections[id].addStream(window.localStream)
                connections[id].createOffer().then((description)=>{
                    connections[id].setLocalDescription(description)
                    .then(()=>{
                        socketRef.current.emit("signal",id,JSON.stringify({"sdp":connections[id].LocalDescription}))
                    })
                    .catch(e=>console.log(e))

                })
            }
        })
          
    }


    //no audio
    let silence=()=>{
        let ctx=new AudioContext()
        let oscillator=ctx.createOscillator()

        let dst=oscillator.connect(ctx.createMediaStreamDestination)

        oscillator.start()
        ctx.resume()
        return object.assign(dst.stream.getAudioTracks()[0],{enabled:false})
    }

    //no video

    let black=({width=640,height=480}={})=>{
        let canvas=Object.assign(document.createElement("canvas"),{width,height})
        canvas.getContext('2d').fillRect(0,0,width,height)
        let stream=canvas.captureStream()
        return Object.assign(stream.getVideoTracks()[0],{enabled:false})
    }





    let getUserMedia=()=>{
        if((video && videoAvailable)||(audio &&audioAvailable)){
            navigator.mediaDevices.getUserMedia({video:video,audio:audio})
            .then(getUserMediaSuccess)
            .then((stream)={})
            .catch(e=>console.log(e))
            
        }
        else{
            try{
                let tracks=localVideoRef.current.srcObject.getTracks()
                tracks.forEach(track=>track.stop())
            }catch(e){
                console.log(e);
                
                
            }
        }
    }


    useEffect(()=>{
        if(video!==undefined && audio!==undefined){
            getUserMedia()
        }
    })

    let gotMessageFromServer=(formId,message)=>{
        var signal=JSON.parse(message)

        if(formId!==socketIdRef.current){
            if(signal.sdp){
                connections[formId].setRemoteDescription(new RTCSessionDescription(signal.sdp))
                .then(()=>{
                    if(signal.sdp.type==="offer"){
                        connections[formId].createAnswer().then((description)=>{
                            connections[formId].setLocalDescription(description).then(()=>{
                                socketIdRef.current.emit("signal",formId,JSON.stringify({"sdp":connections[formId]}))
                            })
                            .catch(e=>console.log(e))
                        }).catch(e=>console.log(e))
                    }
                })
                .catch(e=>console.log(e))


            }

            if(signal.ice){
                connections[formId].addIceCandidate(new RTCIceCandidate(signal.ice))
                .catch(e=>console.log(e))
            }
        }

    }

    let addMessage=()=>{

    }

    let connectToSocketServer=()=>{
        socketRef.current=io.connect(server_url,{secure:false})

        socketRef.current.on('signal',gotMessageFromServer)

        socketRef.current.on("connect",()=>{
            socketRef.current.emit("join-call",window.location.href)

            socketIdRef.current=socketRef.current.id
            socketRef.current.on("chat=message",addMessage)
            //remove video of disconnected user
            socketRef.current.on("user-left",(id)=>{
                setvideo((videos)=>videos.filter((video)=>video.socketId !==id))
            })

            socketRef.current.on("user-joined",(id,clients)=>{
                clients.forEach((socketListId)=>{

                    connections[socketListId]=new RTCPeerConnection(peerConfigConnections)
                    connections[socketListId].onicecandidate=(event)=>{
                        if(event.candidate!=null){
                            socketRef.current.emit("signal",socketListId,JSON.stringify({'ice':event.candidate}))
                        }
                    }


                    connections[socketListId].onaddStream=(event)=>{
                        let videoExists=videoRef.current.find(video=>video.socketId===socketListId)
                        if(videoExists){
                            setvideo(videos=>{
                                const updatedVideos=videos.map(video=>{
                                    video.socketId===socketListId ? {...video,stream:event.stream}:video
                                })

                                videoRef.current=updatedVideos
                                return updatedVideos
                            })
                        }
                        else{
                            let newVideo={
                                socketId:socketListId,
                                stream:event.stream,
                                autoPlay:true,
                                playsinline:true
                            }

                            setVideos(video=>{
                                const updatedVideos=[...video,newVideo]
                                videoRef.current=updatedVideos
                                return updatedVideos
                            })

                        }
                    }

                    if(window.localStream!==undefined && window.localStream!==null){
                        connections[socketListId].addStream(window.localStream)
                    }
                    else{
                        //blank screen
                        let blacksilence=(...args)=>{
                            new MediaStream([black(...args),silence()])

                        }
                        window.localStream=blacksilence()
                        connections[socketListId].addStream(window.localStream)

                    }
                })


                if(id===socketIdRef.current){
                    for(let id2 in connections){
                        if(id2===socketIdRef.current) continue
                        try{
                            connections[id2].addStream(window.localStream)

                        }catch(e){

                        }

                        connections[id2].createOffer().then((description)=>{
                            connections[id2].setLocalDescription(description)
                            .then(()=>{
                                socketRef.current.emit("signal",id2,JSON.stringify({"sdp":connections[id2].LocalDescription}))
                            })
                            .catch(e)
                        })
                    }
                }

            })

        })

    }

    
    let getMedia=()=>{
        setvideo(videoAvailable)
        setAudio(audioAvailable)
        connectToSocketServer()

        


    }

    let connect = () => {
        setAskUsername(false);
        getMedia();
    }

    return ( 
        <div>

            {askUsername===true? 
            <div>
                <div>
                    <video ref={localVideoRef} autoPlay muted></video>
                </div>
                <TextField id="outlined-basic" label="Enter your name" variant="outlined" value={username} onChange={e=>setUsername(e.target.value)} />
                <Button variant="contained" onClick={connect}>Join </Button>
                


            </div>:
            <div>
                <video ref={localVideoRef}></video>

            </div>
                }
        </div>


     );
}
