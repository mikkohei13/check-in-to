<?php
$cacheBuster = "?" . rand(0, 100000);
?>
<!DOCTYPE html>
<html lang="en" class="no-js">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Lintutorni</title>
		<link rel="shortcut icon" href="favicon.ico">

		<link href="https://fonts.googleapis.com/css?family=Merriweather" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,600" rel="stylesheet">
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
                    <div id='observationsLatest'></div>
                    <div id='observationsAggregate'></div>
                </div>
            </div>

            <div id="footer">
                <a href="https://www.biomi.org/" id="biomi">
                    <img src="media/biomi-kotka.png" alt="" />
                    <br />
                    biomi.org
                </a>
                <!-- Placeholder for future use. Currently this site doesn't collect personal information, nor use cookies.' -->
                <!-- <p id="privacy"><a href="privacy.txt">Tietosuojaseloste</a></p> -->
                <p id="checkInStatus"></p>
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
            echo "const lajifi_access_token = '" . $lajifiAccessToken . "';\n";

            echo "const spareId = '" . sha1(uniqid("", true)) . "';\n";
            echo "const ipAddress = '" . $_SERVER['REMOTE_ADDR'] . "'\n";
            ?>
            </script>
            <script src="js/app.js<?php echo $cacheBuster; ?>"></script>
        </div>
	</body>
</html>