<?php

/* --------------------------------------------------
  04/01/2021
  Helper for MINIO UPLOAD
  By : David Prasetyo
  server => http://cdn.ciputragroup.com:9100 
 * ---------------------------------------------------- */

class Cashier_Helpers_Minio extends Zend_Controller_Action_Helper_Abstract {
    
    public $miniodata;
    var $bucket;
    var $s3;
    var $s3_read;

    public function __construct() {
        Zend_Loader::loadFile('Minio/autoload.php', $dirs=null, $once=true);
        date_default_timezone_set('Asia/Jakarta');
        $this->bucket = 'finacc';
        $key = 'cashier';
        $secret = 'c45h13r!';
        $this->s3 = new Aws\S3\S3Client( array(
            'version' => 'latest',
            'region'  => 'us-east-1',
            //'debug' => true,
            //'endpoint' => 'http://13.76.184.138:9100',
            'endpoint' => 'https://cdn.ciputragroup.com:9100',
            'use_path_style_endpoint' => true,
            'credentials' => array(
                'key'    => $key,
                'secret' => $secret,
            ),
            'http'    => array(
              'verify' => false  /* problem ssl */
            )
        ) );
    }

    private function normalizeString($str = '')
    {
        $str = strip_tags($str); 
        $str = preg_replace('/[\r\n\t ]+/', ' ', $str);
        $str = preg_replace('/[\"\*\/\:\<\>\?\'\|]+/', ' ', $str);
        $str = strtolower($str);
        $str = html_entity_decode( $str, ENT_QUOTES, "utf-8" );
        $str = htmlentities($str, ENT_QUOTES, "utf-8");
        $str = preg_replace("/(&)([a-z])([a-z]+;)/i", '$2', $str);
        $str = str_replace(' ', '-', $str);
        $str = rawurlencode($str);
        $str = str_replace('%', '-', $str);
        return $str;
    }

    function upload($filesPath, $module){
        $currentDirectory = getcwd();
        $uploadDirectory = "/uploads/";

        $errors = []; // Store errors here
        $message = "Upload Failed";
        $status = 0;

        $fileExtensionsAllowed = ['jpeg','jpg','png', 'pdf', 'tiff']; // These will be the only file extensions allowed 

        $fileName = $filesPath['name'];
        $fileSize = $filesPath['size'];
        $fileTmpName  = $filesPath['tmp_name'];
        $fileType = $filesPath['type'];

        $expl = explode('.',$fileName);
        $fileExtension = strtolower(end($expl));
        $withoutExt = preg_replace('/\\.[^.\\s]{3,4}$/', '', $fileName);
        $timestamp = date("YmdHis");
        $image_path = $withoutExt.'_'.$timestamp.'.'.$fileExtension;
        $fileName = $this->normalizeString($image_path);
        $uploadPath = $currentDirectory . $uploadDirectory . basename($fileName); //Local
        
        if (true) {

          if (! in_array($fileExtension,$fileExtensionsAllowed)) {
            $errors[] = "Ekstensi file ini tidak diperbolehkan. Harap unggah file PDF, JPEG, TIFF atau PNG<br>";
          }

          if ($fileSize > 5100000) {
            $errors[] = "File melebihi ukuran maksimum (5MB)<br>";
          }

          $minioPath = 'live/upload/'. $module . '/' . basename($fileName);  //Cloud

          if (empty($errors)) {
            //$didUpload = move_uploaded_file($fileTmpName, $uploadPath);
            $didUpload = true;
            if ($didUpload) {

                //Minio
                //config
                $key = 'cashier';
                $secret = 'c45h13r!';
                $bucket =  $this->bucket;
                $s3 = $this->s3;

                try {
                    if($fileExtension == 'pdf' ){
                       $ContentType = 'application/pdf';
                    }else{
                       $ContentType = 'image/'.$fileExtension;
                    }
                    // Upload data.
                    $result = $s3->putObject(array(
                        'Bucket' => $bucket,
                        'SourceFile' => $fileTmpName,
                        'Key'        => $minioPath,
                        'ContentType' => $ContentType
                    ));
                    $status = 1;
                    $message = "File " . basename($fileName) . " berhasil di-upload<br>";
                } catch (S3Exception $e) {
                    $status = 0;
                    $message = "Failed to upload to Server.";
                }

                //unlink
                //@chmod( $uploadPath, 0777 );
                //unlink($uploadPath);
             
            } else {
              $errors[] = "Terjadi kesalahan. Silakan hubungi administrator.<br>";
            }
          } else {
            foreach ($errors as $error) {
              //$errors[] = "These are the errors" . "<br>";
            }
          }

        }

        return array(
            'status' => $status,
            'message' => $message,
            'error' => $errors,
            'path' => $minioPath,
            'module' => $module,
            'filename' => basename($fileName),
            'filesize' => round(($fileSize/1000),1), //on KB
            'addon' => date('Y-m-d H:i:s')
        );
    }

    function view($path){
        $s3                = $this->s3;
        $bucket            = $this->bucket;
        $secret_plans_cmd  = $s3->getCommand('GetObject', ['Bucket' => $bucket, 'Key' => $path]);
        $request           = $s3->createPresignedRequest($secret_plans_cmd, '+1 hour');
        $signedUrl         = $request->getUri();
        $arrContextOptions = array(
          "ssl"=>array(
              "verify_peer"      => false,
              "verify_peer_name" => false,
          ),
      );
        $base64src = base64_encode(file_get_contents($request->getUri(), false, stream_context_create($arrContextOptions)));
        //return $signedUrl;
        $path_info   = pathinfo($path);
        $ext         = $path_info['extension'];
        $f_base64src = $base64src;
        $type        = '';
        
        if($ext=="pdf"){
            $base64src = 'data:application/pdf;base64, '.$base64src;
            $type      = 'application/pdf';
        }else{
            $base64src = 'data:image/'.$ext.';base64,'.$base64src;
            $type      = 'image/'.$ext;
        }
        return array('base64src' => $base64src, 'signedUrl' => urlencode($signedUrl), 'filename' => $path_info['basename'], 'f_base64src' => $f_base64src, 'type' => $type) ;
    }



}
