package com.winterbe.react;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/forums.json")
public class ForumController {

    @Autowired
    private ForumService forumService;

    public ForumController() {
	super();
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Forum> getForums() {
	return forumService.getForums();
    }

    @RequestMapping(method = RequestMethod.POST)
    public List<Forum> addForums(Forum forum) {
	return forumService.addForum(forum);
    }

}
