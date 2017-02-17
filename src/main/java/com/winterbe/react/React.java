package com.winterbe.react;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.Arrays;
import java.util.List;

import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import jdk.nashorn.api.scripting.NashornScriptEngine;

public class React {

    private static final String FAILED_TO_RENDER_REACT_COMPONENT = "failed to render react component";
    private ThreadLocal<NashornScriptEngine> engineHolder = new ThreadLocal<NashornScriptEngine>() {
	@Override
	protected NashornScriptEngine initialValue() {
	    NashornScriptEngine nashornScriptEngine = (NashornScriptEngine) new ScriptEngineManager().getEngineByName("nashorn");
	    try {
		nashornScriptEngine.eval(read("static/nashorn-polyfill.js"));
		nashornScriptEngine.eval(read("static/vendor/react.js"));
		nashornScriptEngine.eval(read("static/vendor/showdown.min.js"));
		nashornScriptEngine.eval(read("static/commentBox.js"));
		nashornScriptEngine.eval(read("static/forum.js"));
		nashornScriptEngine.eval(read("static/fipe.js"));
	    } catch (ScriptException e) {
		throw new RuntimeException(e);
	    }
	    return nashornScriptEngine;
	}
    };

    public String renderCommentBox(List<Comment> comments) throws Exception {
	try {
	    Object html = engineHolder.get().invokeFunction("renderServer", comments);
	    return String.valueOf(html);
	} catch (Exception e) {
	    throw new Exception(FAILED_TO_RENDER_REACT_COMPONENT, e);
	}
    }

    public String renderForumBox(Title title) throws Exception {
	try {
	    Object html = engineHolder.get().invokeFunction("loadServer", Arrays.asList(title));
	    return String.valueOf(html);
	} catch (Exception e) {
	    throw new Exception(FAILED_TO_RENDER_REACT_COMPONENT, e);
	}
    }

    private Reader read(String path) {
	InputStream in = getClass().getClassLoader().getResourceAsStream(path);
	return new InputStreamReader(in);
    }
}