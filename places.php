<?php
$cacheBuster = "?" . rand(0, 100000);
?>
<!DOCTYPE html>
<html lang="en" class="no-js">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Kaikki paikat - CIT</title>
		<link rel="shortcut icon" href="favicon.ico">

		<link href="https://fonts.googleapis.com/css?family=Merriweather" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,600" rel="stylesheet">
		<link rel="stylesheet" href="media/app.css<?php echo $cacheBuster; ?>" media="all" />
        <link rel="stylesheet" href="node_modules/leaflet/dist/leaflet.css" media="all" />

	    <script src="node_modules/jquery/dist/jquery.min.js"></script>
	    <script src="node_modules/handlebars/dist/handlebars.min.js"></script>
        <script src="node_modules/leaflet/dist/leaflet.js"></script>

	</head>
	<body>
        <div id="all">
            <header>
            </header>

            <div id="content">
                <div id="mymap"></div>
            </div>

            <script>
            <?php
            require_once "keys.php";
            if ($_SERVER['HTTP_HOST'] == $devHost) {
                echo "const api_url = '" . $keys['dev']["apiUrl"] . "';\n";
            }
            else {
                echo "const api_url = '" . $keys['production']["apiUrl"] . "';\n";
            }
            echo "const mapboxAccessToken = '" . $mapboxAccessToken . "';";
            ?>
            </script>
            <script src="js/places.js<?php echo $cacheBuster; ?>"></script>
        </div>
	</body>
</html>