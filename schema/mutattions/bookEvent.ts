const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    FlGraphQLFloat
} = require('graphql');

import BookingSchema from "../../models/booking";
import EventSchema from "../../models/type"
import BookingType from "../types/Booking";
import MongoHelper from "../../database/mongodb/mongoDB";

const BookingInputType = new GraphQLInputObjectType({
    name: 'BookingInput',
    fields: {
        eventId: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLInt) },
    }
});


export default {
    type: BookingType,
    description: 'Use this to add a new booking',
    args: {
        input: { type: new GraphQLNonNull(BookingInputType) }
    },
    resolve: async (obj: any, { input }: any, { pgdb }: any) => {
        try {
            let event = await MongoHelper.getEventById(input.eventId)
            let booking = new BookingSchema({
                userId: 2,
                event: event
            })
            let bookingResult: any = await booking.save();
            let users = await pgdb.getUserByIds([input.userId])
            console.log(Object.assign({}, bookingResult, { user: users[0] }))
            return Object.assign({}, bookingResult._doc, { user: users[0] });
        }
        catch (exp) {
            throw new Error(exp);
        }
    }
}