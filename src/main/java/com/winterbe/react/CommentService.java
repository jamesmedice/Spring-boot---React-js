package com.winterbe.react;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommentService {

    private List<Comment> comments = new ArrayList<>();

    public CommentService() {
        comments.add(new Comment("Peter Parker", "This is a comment."));
        comments.add(new Comment("John Doe", "This is *another* comment."));
        comments.add(new Comment("James Medici", "This is a statement."));
        comments.add(new Comment("Van Basten", "This *is a* statement."));
    }

    public List<Comment> getComments() {
        return comments;
    }

    public List<Comment> addComment(Comment comment) {
        comments.add(comment);
        return comments;
    }
}
