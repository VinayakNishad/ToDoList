import mongoose, { Document, Schema } from 'mongoose';

// Interface for what a Task document looks like
export interface ITask extends Document {
  user: mongoose.Schema.Types.ObjectId;
  name: string;
  status: 'Incomplete' | 'Complete';
}

const TaskSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Incomplete', 'Complete'],
      default: 'Incomplete',
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

export default mongoose.model<ITask>('Task', TaskSchema);