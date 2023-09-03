import React,{ useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ]

  const [times, setTimes] = useState({ start:'8:00' , end : '21:30' })
  const [slots, setSlots] = useState([])
  const [classes, setClasses] = useState([])
  const [course, setCourse] = useState('')
  const [data, setdata] = useState([]);
  const [selected, setSelected] = useState(null);


  const calcSlots = () =>{
    //make a variable startime which stores 8 am as a date object
    let startTime = new Date()
    startTime.setHours(8)
    startTime.setMinutes(0)
    
    let endTime = new Date()
    endTime.setHours(21)
    endTime.setMinutes(30)

    let slt = []
    while(startTime < endTime){
      let slot = {
        start: `${startTime.getHours()}:${startTime.getMinutes()}`,
        end: `${startTime.getHours() + 1}:${startTime.getMinutes() + 30}`
      }
      slt.push(slot)
      startTime.setMinutes(startTime.getMinutes() + 90)
    }
    setSlots(slt)
  }


  const submit = (e) =>{
    console.log(course,data)
    let temp = classes;
    temp.push({course: course, data: data})
    setClasses(temp);

    setCourse('')
    let cells = document.querySelectorAll('.cellSelect')
    cells.forEach(cell => {
      cell.classList.remove('selected')
    }
    )

  }
  useEffect(() => {
    calcSlots()
  },[])

  const getDayandSlot = (e) =>{
    const dayIndex = e.target.parentNode.rowIndex - 1;
    const slotIndex = e.target.cellIndex - 1;
    e.target.classList.toggle('selected')
    let temp = data;
    temp.push({day: dayIndex, slot: slotIndex})
    setdata(temp) 
    console.log(`Day: ${dayIndex}, Slot: ${slotIndex}`);

  }

  function getColumn(slot) {
    setSelected(slot);
  }


  const addClass = (e) =>{
    //get row and column
    const row = e.target.parentNode.rowIndex - 1;
    const column = e.target.cellIndex - 1;

    //find data in classes where data.day = row and data.slot = column
    let temp = classes;
    let found = false;
    temp.forEach((item, index) => {
      item.data.forEach((d, i) => {
        if(d.day === row && d.slot === column){
          found = true;
          e.target.classList.add('selected')
          e.target.innerHTML = item.course
        }
      })
    }
    )

  }

  return (
    <div className="App">
      <table >
        <thead>
          <tr style={{ 
            border: '1px solid black',
            borderCollapse: 'collapse',
            width: '100%'
            
           }}>
            <th></th>
            {
              slots.map((slot, index) => {
                return <th key={index}>{slot.start} - {slot.end }</th>
              }
              )
            }
          </tr>
        </thead>
        <tbody>
          {
            days.map((day, dayindex) => {
              return (
                <tr key={dayindex}>
                  <td>{day}</td>
                  <td onMouseOver={addClass}></td>
                  <td onMouseOver={addClass}></td>
                  <td onMouseOver={addClass}></td>
                  <td onMouseOver={addClass}></td>
                  <td onMouseOver={addClass}></td>
                  <td onMouseOver={addClass}></td>
                  <td onMouseOver={addClass}></td>
                  <td onMouseOver={addClass}></td>
                  <td onMouseOver={addClass}></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      <h3>Enter your classes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label htmlFor="course">Course:</label>
            <input type="text" name="course" id="course" onChange={(e)=>{
              setCourse(e.target.value)
            }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label htmlFor="slots">Slots (day - slot) comma separated:</label>
          <table >
        <thead>
          <tr style={{ 
            border: '1px solid black',
            borderCollapse: 'collapse',
            width: '100%'
            
           }}>
            <th></th>
            {
              slots.map((slot, index) => {
                return <th key={index}>{slot.start} - {slot.end }</th>
              }
              )
            }
          </tr>
        </thead>
        <tbody>
          {
            days.map((day, index) => {
              return (
                <tr key={index}>
                  <td>{day}</td>
                  <td onClick={getDayandSlot} className='cellSelect'></td>
                  <td onClick={getDayandSlot} className='cellSelect'></td>
                  <td onClick={getDayandSlot} className='cellSelect'></td>
                  <td onClick={getDayandSlot} className='cellSelect'></td>
                  <td onClick={getDayandSlot} className='cellSelect'></td>
                  <td onClick={getDayandSlot} className='cellSelect'></td>
                  <td onClick={getDayandSlot} className='cellSelect'></td>
                  <td onClick={getDayandSlot} className='cellSelect'></td>
                  <td onClick={getDayandSlot} className='cellSelect'></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
        </div>
        <div style={{ display: 'flex', margin:'10px',  flexDirection: 'column', alignItems: 'center' }}>
          <input type="submit" value="Add" style={{ width:'10vw', backgroundColor:'green', borderRadius:'10px' }} onClick={submit} />
        </div>

    </div>
  )
}

export default App
