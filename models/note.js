import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const notesSchema = new Schema({
    content: String,
}, {
    timestamps: true,
});

const Note = mongoose.model('Note', notesSchema)

export {
    Note
}