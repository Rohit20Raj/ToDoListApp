import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const initialNoteState = { title: '', description: '', tag: '' };
    const [note, setNote] = useState(initialNoteState);

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote(initialNoteState); // Reset note state to initial empty values
        props.showAlert("Note Added Successfully", "success");
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };
    // const onChange = (e) => {
    //     setNote({ ...note, [e.target.name]: e.target.id });
    // };

    return (
        <div className='my-3 '>
            {/* <h1>Add a Note</h1> */}
            <button type="button" className="btn btn-lg btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                ADD NOTE
            </button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add a Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        aria-describedby="title"
                                        onChange={onChange}
                                        placeholder="Title cannot be blank"
                                        value={note.title} // Bind the value to note.title
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        onChange={onChange}
                                        value={note.description} // Bind the value to note.description
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">
                                        Tag
                                    </label>
                                    <div className="d-flex">
                                        <div className="form-check mx-1">
                                            <input type="radio"
                                                className="form-check-input"
                                                id="Reminder"
                                                name="tag"
                                                onChange={onChange}
                                                value="Reminder"
                                            />
                                            <label className="form-check-label" htmlFor="Reminder">Reminder</label>
                                        </div>
                                        <div className="form-check mx-1">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                id="ToDo"
                                                name="tag"
                                                onChange={onChange}
                                                value="ToDo"
                                            />
                                            <label className="form-check-label" htmlFor="ToDo">ToDo</label>
                                        </div>
                                        <div className="form-check mx-1">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                id="Important"
                                                name="tag"
                                                onChange={onChange}
                                                value="Important"
                                            />
                                            <label className="form-check-label" htmlFor="Important">Important</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='modal-footer'>

                                    <button
                                        data-bs-dismiss="modal"
                                        disabled={note.title.length === 0}
                                        type="submit"
                                        className="btn btn-primary"
                                        onClick={handleSubmit}
                                    >
                                        Add a Note
                                    </button>
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNote;
