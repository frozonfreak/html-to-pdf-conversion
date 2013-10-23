<?php
    require 'pdfcrowd.php';
    $receivedData = json_decode(file_get_contents("php://input"));
    if(isset($receivedData->{"type"})){
        switch ($receivedData->{"type"}) {
            case 'convertToPDF':
                try
                {   
                    // create an API client instance
                    $client = new Pdfcrowd("frozonfreak", "60bb5fdfef0b88d4d9dbb9edfddf995c");

                    // convert a web page and store the generated PDF into a $pdf variable
                    //$pdf = $client->convertURI($receivedData->{"URLText"});

                    // set HTTP response headers
                    //header("Content-Type: application/pdf");
                    //header("Cache-Control: no-cache");
                    //header("Accept-Ranges: none");
                    //header("Content-Disposition: attachment; filename=\"google_com.pdf\"");

                    // send the generated PDF 
                    //echo $pdf;

                    $out_file = fopen("document.pdf", "wb");
                    $client->convertURI($receivedData->{"URLText"}, $out_file);
                    fclose($out_file);
                    echo json_encode(array("status" => 1,"message"=> "document.pdf"));
                }
                catch(PdfcrowdException $why)
                {
                    echo "Pdfcrowd Error: " . $why;
                }
            break;
        }

    }
    else{
        exit(json_encode(array("status" => 0,"message"=> "Error")));
    }

?>