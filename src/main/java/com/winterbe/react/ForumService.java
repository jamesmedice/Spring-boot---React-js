package com.winterbe.react;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ForumService {

    List<Forum> forums;

    public ForumService() {
	getForums().add(new Forum("All Star Games", Arrays.asList("BasketBall", "FootBall", "Swimming")));
	getForums().add(new Forum("World Order", Arrays.asList("OTAN", "OPEP", "NAFTA")));
    }

    public List<Forum> getForums() {
	if (forums == null)
	    forums = new ArrayList<Forum>();

	return forums;
    }

    public List<Forum> addForum(Forum forum) {
	forums.add(forum);
	return forums;
    }
}
