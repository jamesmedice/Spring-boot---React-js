package com.winterbe.react;

import java.util.ArrayList;
import java.util.List;

public class Forum {

    public Forum(String category, List<String> issues) {
	super();
	this.category = category;
	this.issues = issues;
    }

    private String category;

    private List<String> issues;

    public String getCategory() {
	return category;
    }

    public List<String> getIssues() {
	if (issues == null)
	    issues = new ArrayList<String>();

	return issues;
    }

    public void setCategory(String category) {
	this.category = category;
    }

}
