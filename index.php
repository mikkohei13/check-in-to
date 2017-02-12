<?php
$cacheBuster = "?" . rand(0, 100000);
?>
<!DOCTYPE html>
<html lang="en" class="no-js">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Check-in</title>
		<link rel="shortcut icon" href="favicon.ico">

		<link href="https://fonts.googleapis.com/css?family=Merriweather" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet">
		<link rel="stylesheet" href="media/app.css<?php echo $cacheBuster; ?>" media="all" />

	    <script src="node_modules/jquery/dist/jquery.min.js"></script>
	    <script src="node_modules/handlebars/dist/handlebars.min.js"></script>

	</head>
	<body>
        <div id="all">
            <header>
                <img src="media/cit-logo.svg" id="logo">
                <h1></h1>                
                <div id="status">
                    <span class='status'>Paikkaa haetaan...</span>
                </div>
            </header>

            <div id="content">
                <div id="description"></div>
                <div id="observations">
                    <h3>Havaintoja</h3>
                    <div id='observationContainer'></div>
                </div>
            </div>

            <div id="footer">
                <a href="https://www.biomi.org/" id="biomi">
                    <img src="media/biomi-kotka.png" alt="" />
                    <br />
                    biomi.org
                </a>
                <div id="checkInStatus"></div>
            </div>

            <script>
            <?php
            echo "const spareId = '" . sha1(uniqid("", true)) . "';\n";
            echo "const ipAddress = '" . $_SERVER['REMOTE_ADDR'] . "'\n";
            ?>
            </script>
            <script src="keys.js<?php echo $cacheBuster; ?>"></script>
            <script src="js/app.js<?php echo $cacheBuster; ?>"></script>
        </div>
	</body>
</html>