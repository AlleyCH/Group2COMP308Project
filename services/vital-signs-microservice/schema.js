const { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLFloat, GraphQLString, GraphQLList, GraphQLNonNull } = require('graphql');
const VitalSigns = require('./models/VitalSigns');
const MotivationalTip = require('./models/MotivationalTip');
const EmergencyAlert = require('./models/EmergencyAlert');
const SymptomChecklist = require('./models/SymptomChecklist');

const VitalSignsType = new GraphQLObjectType({
  name: 'VitalSigns',
  fields: () => ({
    id: { type: GraphQLID },
    temperature: { type: GraphQLFloat },
    heartRate: { type: GraphQLFloat },
    bloodPressure: { type: GraphQLString },
    respiratoryRate: { type: GraphQLFloat },
    createdAt: { type: GraphQLString },
    info: { type: GraphQLString }
  })
});

const MotivationalTipType = new GraphQLObjectType({
  name: 'MotivationalTip',
  fields: () => ({
    id: { type: GraphQLID },
    message: { type: GraphQLString },
    createdAt: { type: GraphQLString }
  })
});

const EmergencyAlertType = new GraphQLObjectType({
  name: 'EmergencyAlert',
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    message: { type: GraphQLString },
    location: { type: GraphQLString },
    createdAt: { type: GraphQLString }
  })
});

const SymptomChecklistType = new GraphQLObjectType({
  name: 'SymptomChecklist',
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    symptoms: { type: new GraphQLList(GraphQLString) },
    createdAt: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getVitalSigns: {
      type: new GraphQLList(VitalSignsType),
      resolve() {
        return VitalSigns.find();
      }
    },
    getDailyTips: {
      type: new GraphQLList(MotivationalTipType),
      resolve() {
        return MotivationalTip.find();
      }
    },
    getEmergencyAlerts: {
      type: new GraphQLList(EmergencyAlertType),
      resolve() {
        return EmergencyAlert.find();
      }
    },
    getSymptomChecklists: {
      type: new GraphQLList(SymptomChecklistType),
      resolve() {
        return SymptomChecklist.find();
      }
    },
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addVitalSigns: {
      type: VitalSignsType,
      args: {
        temperature: { type: new GraphQLNonNull(GraphQLFloat) },
        heartRate: { type: new GraphQLNonNull(GraphQLFloat) },
        bloodPressure: { type: new GraphQLNonNull(GraphQLString) },
        respiratoryRate: { type: new GraphQLNonNull(GraphQLFloat) },
        info: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let vitalSigns = new VitalSigns(args);
        return vitalSigns.save();
      }
    },
    updateVitalSigns: {
      type: VitalSignsType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        temperature: { type: GraphQLFloat },
        heartRate: { type: GraphQLFloat },
        bloodPressure: { type: GraphQLString },
        respiratoryRate: { type: GraphQLFloat },
        info: { type: GraphQLString },
      },
      resolve(parent, args) {
        return VitalSigns.findByIdAndUpdate(args.id, args, { new: true });
      }
    },
    addMotivationalTip: {
      type: MotivationalTipType,
      args: {
        message: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let tip = new MotivationalTip(args);
        return tip.save();
      }
    },
    addEmergencyAlert: {
      type: EmergencyAlertType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        message: { type: new GraphQLNonNull(GraphQLString) },
        location: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let alert = new EmergencyAlert(args);
        return alert.save();
      }
    },
    submitSymptomChecklist: {
      type: SymptomChecklistType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        symptoms: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
      },
      resolve(parent, args) {
        let checklist = new SymptomChecklist(args);
        return checklist.save();
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
