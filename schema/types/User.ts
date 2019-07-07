import { GraphQLList } from "graphql";
import Event from "../types/Event";
import UserEventsSchema from "../../models/userEvents";

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLInt,
    GraphQLFloat
} = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => {
        return {
            id: { type: GraphQLID },
            username: { type: new GraphQLNonNull(GraphQLString) },
            password: { type: new GraphQLNonNull(GraphQLString) },
            email: { type: new GraphQLNonNull(GraphQLString) },
            userEvents: {
                type: new GraphQLList(Event),
                resolve: async (obj: any, { input }: any, { pgdb }: any) => {
                    let userEventsObj=await UserEventsSchema.findOne({userId:obj.id})
                    .populate({path:'userEvents'})
                    .exec()
                    return userEventsObj.userEvents;
                }
            }
        }
    },

})

export default UserType;