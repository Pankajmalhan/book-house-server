const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    FlGraphQLFloat
} = require('graphql');

import EventModel from "../../models/type";
import UserType from "../types/User"
import { GraphQLFloat } from "graphql";
import { InputType } from "zlib";
const bcrypt = require('bcryptjs');

const UserInputType = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
    }
});


export default {
    type: UserType,
    description: 'Use this method to add a new user',
    args: {
        input: { type: new GraphQLNonNull(UserInputType) }
    },
    resolve(obj: any, { input }: any, { pgdb }: any) {
        return bcrypt.hash(input.password, 12).
            then(async (hashedPassword: String) => {
                let result = await pgdb.getUserByEmail(input.email)
                if (result.length > 0) {
                    return new Error("Email already exist");
                } else {
                    return pgdb.addUser(input.username, input.email, hashedPassword)
                }
            }).
            catch((exp: any) => {
                console.log(exp)
                throw new Error(exp.detail)
            })
    }
}