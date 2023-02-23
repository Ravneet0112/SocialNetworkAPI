const { Schema, Type , model } = require('mongoose');
const reaction = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: 'string',
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: { 
            type: Date, 
            default: Date.now,
        },
        username: { 
            type: 'string', 
            required: true,
        },
        reactions: [reaction],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    });

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});


const Thought = model('Thought', thoughtSchema);



module.exports = Thought;


