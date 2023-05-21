import { useState , useRef, useEffect} from "react";

function App() {
  const [myPositions,setMyPostions]=useState([])
  const [currentPosition,setCurrentPosition]=useState('')
  const [deletedWithUndo,setDeletedWithUndo]=useState([])
  const undoRef=useRef(null)
  const redoRef=useRef(null)

    useEffect(()=>{
        setCurrentPosition(myPositions[myPositions.length-1])
  },[myPositions])
  
//   const colorRef=useRef(null)
//   useEffect(()=>{
//     colorRef.style.backgroundColor=randomRgbColor()
//   },[myPositions])

  const randomRgbColor = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  };

  const handleClick = (event)=>{
    if(event.target === undoRef.current || event.target === redoRef.current){
        return
    }
        const x=event.clientX
        const y=event.clientY
        const newPosition = {x,y}
        setMyPostions((prev)=>[...prev,newPosition])
  }
  const handleUndo = ()=>{
    if(currentPosition){
        setDeletedWithUndo([...deletedWithUndo,currentPosition])
        setMyPostions(myPositions.slice(0,-1))
    }
  }

  const handleRedo = ()=>{
    if(deletedWithUndo.length>0){
        const lastDeleted = deletedWithUndo[deletedWithUndo.length-1]
        setMyPostions([...myPositions,lastDeleted])
        setDeletedWithUndo(deletedWithUndo.slice(0,-1))
        console.log('12s');
    }
  }
  return (
    <div 
        style={{width:'100%',height:'100vh',backgroundColor:'gray'}}
        onClick={handleClick}
    >
        {myPositions?.map((item,index)=>{
            return (
                <div 
                key={index}
                style={{
                    width:20,height:20,borderRadius:'50%',backgroundColor:randomRgbColor(),
                    position:'fixed',top:item.y,left:item.x, transform:'translate(-50%,-50%)'
                }}
                >
                </div>
            )
        })}
        <div style={{position:'fixed',top:'20px',left:'50%',transform:'translateX(-50%)'}}>
            <button
            onClick={handleUndo}
            ref={undoRef}
            disabled={myPositions.length===0}
            >
                undo
            </button>
            <button
            onClick={handleRedo}
            ref={redoRef}
            disabled={deletedWithUndo.length===0}
            >
                redo
            </button>
        </div>
    </div>
  )
}

export default App;
