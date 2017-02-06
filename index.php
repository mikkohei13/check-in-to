<!DOCTYPE html>
<html lang="en" class="no-js">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Check-in</title>
		<link rel="shortcut icon" href="favicon.ico">

		<link href="https://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet">
		<link rel="stylesheet" href="media/app.css" media="all" />

	    <script src="node_modules/jquery/dist/jquery.min.js"></script>
	    <script src="node_modules/handlebars/dist/handlebars.min.js"></script>

	</head>
	<body>
		<header>
			<h1>Check-in to</h1>
		</header>

		<div id="content">
			<div id="place"></div>
		</div>

        <script>
        <?php
        echo "const spareId = '" . sha1(uniqid("", true)) . "';\n";
        echo "const ipAddress = '" . $_SERVER['REMOTE_ADDR'] . "'\n";
        ?>
        </script>
		<script src="keys.js"></script>
		<script src="js/app.js"></script>
	</body>
</html>
