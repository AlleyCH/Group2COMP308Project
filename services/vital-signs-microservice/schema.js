const { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLFloat, GraphQLString, GraphQLList, GraphQLNonNull } = require('graphql');
const VitalSigns = require('./models/VitalSigns');

const VitalSignsType = new GraphQLObjectType({
  name: 'VitalSigns',
  fields: () => ({
    id: { type: GraphQLID },
    temperature: { type: GraphQLFloat },
    heartRate: { type: GraphQLFloat },
    bloodPressure: { type: GraphQLString },
    respiratoryRate: { type: GraphQLFloat },
    createdAt: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getVitalSigns: {
      type: new GraphQLList(VitalSignsType),
      resolve(parent, args) {
        return VitalSigns.find();
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
      },
      resolve(parent, args) {
        let vitalSigns = new VitalSigns({
          temperature: args.temperature,
          heartRate: args.heartRate,
          bloodPressure: args.bloodPressure,
          respiratoryRate: args.respiratoryRate,
        });
        return vitalSigns.save();
      }
    },
    updateVitalSigns: {
      type: VitalSignsType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }, // Identifies which vital signs entry to update
        temperature: { type: GraphQLFloat },
        heartRate: { type: GraphQLFloat },
        bloodPressure: { type: GraphQLString },
        respiratoryRate: { type: GraphQLFloat },
      },
      resolve(parent, args) {
        const { id, temperature, heartRate, bloodPressure, respiratoryRate } = args;
        // Update the document and return the updated document
        return VitalSigns.findByIdAndUpdate(id, { temperature, heartRate, bloodPressure, respiratoryRate }, { new: true });
      }
    },
  }
});


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
