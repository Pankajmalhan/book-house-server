const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    FlGraphQLFloat
} = require('graphql');

import EventModel from "../../models/type";
import UserEventSchema from "../../models/userEvents";
import EventType from "../types/Event"
import { GraphQLFloat } from "graphql";
import { InputType } from "zlib";
import { IEventType } from "../../interfaces/common";

const EventInputType = new GraphQLInputObjectType({
    name: 'EventInput',
    fields: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLFloat) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLString) },
    }
});


export default {
    type: EventType,
    description: 'Use this to add a new type',
    args: {
        input: { type: new GraphQLNonNull(EventInputType) }
    },
    resolve: async (obj: any, { input }: any, { isAuth, userId }: any) => {
        try {
            if (!isAuth) {
                throw new Error('User is not authenticated')
            }
            const event = new EventModel({
                title: input.title,
                description: input.description,
                price: input.price,
                date: new Date(),
                creator: userId
            })
            await event.save();
            //ask this from abhishek how to manage with typeScript
            let userEventsObj: any = await UserEventSchema.findOne({ userId: userId });
            if (userEventsObj) {
                userEventsObj.userEvents.push(event._id)
                await userEventsObj.save();
            }
            return event;
        }
        catch (exp) {
            throw new Error(exp);
        }
    }
}