import mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    userId: {
        type: Number,
        required: true,
        unique: true
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }
},
    { timestamps: true })

const BookingModel = mongoose.model('Booking', BookingSchema);
export default BookingModel;