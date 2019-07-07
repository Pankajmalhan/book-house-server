import EventModel from "../../models/type";

export default class MongoHelper {
    public static async getEventById(eventId: String) {
        try {
            let event = await EventModel.findOne({ _id: eventId });
            return event;
        } catch (exp) {

        }
    }
}