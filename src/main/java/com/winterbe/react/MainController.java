package com.winterbe.react;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
public class MainController {

    private CommentService service;

    private ForumService forumService;

    private React react;

    private ObjectMapper mapper;

    @Autowired
    public MainController(CommentService service, ForumService forumService) {
	this.forumService = forumService;
	this.service = service;
	this.react = new React();
	this.mapper = new ObjectMapper();
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index(Map<String, Object> model) throws Exception {
	try {

	    // String forumTitle = react.renderForumBox(new
	    // Title("Loading Forums"));
	    // model.put("contentSibling", forumTitle);

	    List<Forum> forums = forumService.getForums();
	    List<Comment> comments = service.getComments();

	    // String commentBox = react.renderCommentBox(comments);
	    // model.put("content", commentBox);

	    String dataSibling = mapper.writeValueAsString(forums);
	    model.put("dataSibling", dataSibling);
	    String data = mapper.writeValueAsString(comments);
	    model.put("data", data);
	    return "index";
	} catch (Exception e) {
	    return "error";
	}
    }

}
