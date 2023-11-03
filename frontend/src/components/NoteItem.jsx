import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const noteDate = (date) => {
        let notedate = new Date(date).toLocaleString("en-US", { timeZone: 'Asia/Kolkata' });
        return notedate;
    };
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    let date = note.date;
    return (
        <div className='p-2'>
            <div className="card mb-3">
                <span className="badge  text-bg-danger" style={{
                    position: 'absolute',
                    zIndex: '1',
                    right: '0',
                    top: '-7%'
                }}>
                    {note.tag}
                </span>
                <div className="card-header text-bg-primary"><h3>{note.title}</h3></div>
                <div className="card-body text-bg-dark">
                    {/* <h5 class="card-title">Secondary card title</h5> */}
                    <h5 className="card-text">{note.description}</h5>
                    <div className='d-flex justify-content-between'>
                        <div className='p-2'>
                            <i className="fa-regular fa-pen-to-square mx-1" onClick={() => { updateNote(note) }}></i>
                            <i className="fa-regular fa-trash-can mx-1" onClick={() => { deleteNote(note._id); props.showAlert("Note Deleted", "danger") }}></i>
                        </div>
                        <div className='p-2' style={{
                            fontSize: '0.75rem'
                        }}>Date added: {noteDate(date)}</div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default NoteItem