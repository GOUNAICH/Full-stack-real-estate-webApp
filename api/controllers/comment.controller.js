import prisma from "../lib/prisma.js";

// Get all comments for a specific post
export const getComments = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: {
        user: true, // Include user data
        post: true, // Include post data
        replies: true,
      },
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching comments" });
  }
};

// Add a new comment
export const addComment = async (req, res) => {
  const { postId } = req.params;
  const { text, userId } = req.body;
  try {
    const comment = await prisma.comment.create({
      data: {
        text,
        userId,
        postId,
      },
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Error adding comment" });
  }
};

// Update an existing comment
export const updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;
  try {
    const comment = await prisma.comment.update({
      where: { id: commentId },
      data: { text },
    });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Error updating comment" });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  try {
    await prisma.comment.delete({
      where: { id: commentId },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting comment" });
  }
};

// Add a reply to a comment
export const addReply = async (req, res) => {
  const { commentId } = req.params;
  const { text, userId } = req.body;
  try {
    const reply = await prisma.reply.create({
      data: {
        text,
        userId,
        commentId,
      },
    });
    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ error: "Error adding reply" });
  }
};

// Delete a reply
export const deleteReply = async (req, res) => {
  const { replyId } = req.params;
  try {
    await prisma.reply.delete({
      where: { id: replyId },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting reply" });
  }
};
