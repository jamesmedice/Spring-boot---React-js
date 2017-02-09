package com.winterbe.react;

import java.util.Date;

public class Title {

    public Title(String title) {
	this(title, new Date());
    }

    public Title(String title, Date current) {
	super();
	this.current = current;
	this.title = title;
    }

    private String title;

    private Date current;

    public String getTitle() {
	return title;
    }

    public void setTitle(String title) {
	this.title = title;
    }

    public Date getCurrent() {
	return current;
    }

    public void setCurrent(Date current) {
	this.current = current;
    }

}
