import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: String,
    cuisine: String,
    imageURL: String,
    difficulty: {
        type: String,
        enum: ['Jamie Oliver (Easy)', 'Guy Fieri (Medium)', 'Bobby Flay (Hard)', 'Gordon Ramsay (Advanced)']
    },
    recipeNotes: [{
        type: Schema.Types.ObjectId,
        ref: "Notes",
    }],
}, {
    timestamps: true,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export {
    Recipe
}