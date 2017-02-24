<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@page import="java.util.Map.Entry"%>
<%@page import="java.util.Map"%>
<html>
<head>
<title>React Page</title>
<link rel="stylesheet" type="text/css" href="css/main.css" />
<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />

<script type="text/javascript" src="vendor/react.js"></script>
<script type="text/javascript" src="vendor/showdown.min.js"></script>

<script type="text/javascript" src="http://code.jquery.com/jquery-1.10.0.min.js"></script>

<script type="text/javascript" src="commentBox.js"></script>
<script type="text/javascript" src="forum.js"></script>
<script type="text/javascript" src="fipe.js"></script>
	
</head>
<body>
	<div id="mainHead" class="main">
		<input type="button" onclick="loadMotors()" value="LIST ALL BRANDS" />
	</div>

	<div id="carsHead" class="main">
	</div>

	<div id="carDetails"></div>
	
	<div id="content"
		style="margin: auto; border: solid 1px #0088DD; margin-bottom: 50px">${content}</div>

	<div id="contentSibling"
		style="margin: auto; border: solid 1px #0428AA; margin-bottom: 50px">${contentSibling}</div>

	<script type="text/javascript">
    $(function () {
        renderClient(${data});
        loadClient(${dataSibling});
    });
        
</script>
</body>
</html>