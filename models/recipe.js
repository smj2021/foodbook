import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    cuisine: {
        type: String,
        required: true,
    },
    imageURL: String,
    difficulty: {
        type: String,
        enum: ['Jamie Oliver (Easy)', 'Guy Fieri (Medium)', 'Bobby Flay (Hard)', 'Gordon Ramsay (Advanced)'],
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note',
    }],
}, {
    timestamps: true,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export {
    Recipe
}