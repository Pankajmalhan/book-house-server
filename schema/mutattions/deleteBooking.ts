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

const DeleteBookingInputType = new GraphQLInputObjectType({
    name: 'DeleteBookingInput',
    fields: {
        eventId: { type: new GraphQLNonNull(GraphQLString) },
    }
});


export default {
    type: GraphQLString,
    description: 'Use this method to delete booking',
    args: {
        input: { type: new GraphQLNonNull(DeleteBookingInputType) }
    },
    resolve: async (obj: any, { input }: any, { pgdb }: any) => {
        try {
            let booking:any = await BookingSchema.findOneAndDelete({event:input.eventId});
            return booking._id
        }
        catch (exp) {
            console.log({ exp })
            throw new Error(exp);
        }
    }
}