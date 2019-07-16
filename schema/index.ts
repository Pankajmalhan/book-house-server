const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLList
} = require('graphql');
import EventModel from "../models/type";
import EventType from "./types/Event";
import LogInType from "./types/Login";
import BokingModel from "../models/booking";

import AddEventMutation from "./mutattions/addEvent";
import AddUserMutation from "./mutattions/addUser";
import BookEvent from "./mutattions/bookEvent";
import DeleteBooking from "./mutattions/deleteBooking";
import BookingType from "./types/Booking";
import BookingModel from "../models/booking";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const GraphQueryType = new GraphQLObjectType({
    name: 'GrapghQueryType',
    fields: {
        event: {
            type: new GraphQLNonNull(GraphQLList(EventType)),
            resolve: (obj: any, { input }: any, { pgdb,isAuth,userId }: any) => {
                console.log(isAuth,userId)
                return EventModel.find().then(events => {
                    return events
                }).catch(exp => {
                    throw exp
                })
            }
        },
        booking: {
            type: new GraphQLNonNull(GraphQLList(BookingType)),
            resolve: () => {
                return BookingModel.find().then(bookings => {
                    return bookings
                }).catch(exp => {
                    throw exp
                })
            }
        },
        logIn: {
            type: new GraphQLNonNull(LogInType),
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: async (obj: any, { email, password }: any, { pgdb }: any) => {
                let user = await pgdb.getUserByEmail(email);
                if (user[0]) {
                    const isUserValid = await bcrypt.compare(password, user[0].password);
                    if (isUserValid) {
                        const token = jwt.sign({ userId: user.id, email: user.email },
                            'thisismyprivatekey',
                            {
                                expiresIn: '2h'
                            });
                        return {
                            userId: user[0].id,
                            token,
                            expiresIn: 2
                        }
                    } else {
                        throw new Error("password is not correct");
                    }
                } else {
                    throw new Error("user doesn't exist");
                }
            }
        }
    }
})

const RootMutationType = new GraphQLObjectType({
    name: 'RootMutationType',
    fields: () => ({
        AddEvent: AddEventMutation,
        AddUser: AddUserMutation,
        BookEvent: BookEvent,
        DeleteBooking: DeleteBooking
    })
})

const ncSchema = new GraphQLSchema({
    query: GraphQueryType,
    mutation: RootMutationType
});

export default ncSchema;