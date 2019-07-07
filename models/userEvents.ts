import mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userEventsSchema = new Schema({
    userId: {
        type: Number,
        required: true,
        unique:true
    },
    userEvents: [{
        type: [Schema.Types.ObjectId],
        ref:'Event'
    }]
})

const userEventsModel = mongoose.model('UserEvents', userEventsSchema);
export default userEventsModel;