'use strict'

const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const veteSchema = new Schema({
              id: Schema.Types.ObjectId,
              name: Number,
              address: String,
              email: String
              schedule:{type: Schema.Types.ObjectId, ref: 'Schedule' } ,
              GeographicLocation: String,
              Active: Boolean,
              });

const scheduleSchema = new Schema({
          id: {type: Schema.Types.ObjectId, ref: 'Vete'},
          day:{type: Number, required:true} ,
          openingTime: String,
          ClosingTime: String,
          Active: Boolean,
        });

let Vete = mongoose.model('Vete', veteSchema);
let Schedule = mongoose.model('Schedule', scheduleSchema);
let Opinion = mongoose.model('Opinion', opinionSchema);
let AccesCode = mongoose.model('AccesCode', accessCodeSchema);

const opinionSchema = new Schema({
  veterinary: {type: Schema.Types.ObjectId, ref: 'Vete',required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User', required:true},
  dateTime: {type:Date, required:true},
  opinionText: {type: String},
  qualification: {type: Number },
})

const accessCodeSchema = new Schema({
  randomid: {Schema.Types.ObjectId},
  pet : {type: Schema.Types.ObjectId, ref: 'Pet' },
  veterinary: {type: Schema.Types.ObjectId, ref: 'Vete'},
  expirationDateTime: {type: Date },
  usedDateTime: {type: Date },
  retirementDateTime: {type: Date },
})

let Pet = mongoose.model('Pet', petSchema);

const petSchema = new Schema({
    id : {Schema.Types.ObjectId},
    Name : {type: String },
    breed: {type: String },
    Owner: {type: Schema.Types.ObjectId, ref: 'User'},
    birthDate: {type: Date},
    acquisitionDate: {type: Date},
    photo: {type: Schema.Types.ObjectId, ref: 'Files'}
    active: {type: Boolean},
});

let User = mongoose.model('User', userSchema),
let Files = mongoose.model('Files', filesSchema),

const userSchema = new Schema({
  nicknam: {Schema.Types.ObjectId},
  name: {type: String },
  role:  {type: Schema.Types.ObjectId, ref: 'Role'},
  email: {type: String},
  password: {type: String},
  active : {type: Boolean},
  photo :  {type: Schema.types.ObjectId, ref: 'Files'},
});

const filesSchema = new Schema({
  id: {Schema.Types.ObjectId},
  binaryDAta: {type: Binarios},
  Name:{type: String},
  Extension:{type: String},
});

const treatmentSchema = new Schema({
  id: {Schema.Types.ObjectId};
  accessCode: {type: Schema.Types.ObjectId, ref: 'AccessCode'},
  dataTime: {type: Date},
  name: {type: String},
  description: {type: String},
  active: {type: Boolean},
});

let AccessCode = mongoose.model('AccessCode', accessCodeSchema);

const recomendation = new Schema({
  id: {Schema.Types.ObjectId},
  treatment : {type: Schema.Types.ObjectId, ref: 'TrearmMent'},
  description: {type: String},
  active: {type: Boolean},
});

let TrearmMent = mongoose.model('TrearmMent', accessCodeSchema);
let Role = mongoose.model('Role', roleSchema),

const roleSchema = new Schema ({
  id: {Schema.Types.ObjectId},
  name: { type: String},
  app: {type: Schema.Types.ObjectId, ref: 'Aplication'},
  active:{type: Boolean},
});

let Aplication = mongoose.model('Aplication' aplicationSchema);

const aplicationSchema = new Schema({
  id:{Schema.Types.ObjectId},
  name:{type: String},
});

const passwordRecovery = new Schema({
  randomid: {Schema.Types.ObjectId},
  user: {types: Schema.Types.ObjectId, ref: 'User'},
  expirationDateTime: {type: Date},
  used: {type: String},
});
