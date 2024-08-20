<?php

/**
 *
 * 	phpMSWordParser
 *  Develop by Creative Software Solution
 *
 * 	Version 1.0
 * 	Copyright (C) 2010, Creative Software Solution
 * 	Released under LGPL License.
 *
 *  Email: socket70@gmail.com
 *
 *  If you find phpMSWordParser is useful to you, you may donate:
 *  http://sourceforge.net/donate/index.php?group_id=357665
 * 	
 *
 * 	For usage example, please refer to the 'examples' folder
 *
 */
error_reporting(E_PARSE);

function __autoload($strClassName) {
    require_once dirname(__FILE__) . '/' . $strClassName . '.php';
}

class Erems_Box_Library_Phpmswordparser {

    //
    public $searchlist;
    public $error;
    public $templatefile;
    public $outputfile;
    public $verbose;
    public $debug;
    public $multi;
    //
    private $_zip;
    private $_templatepath;
    private $_templatefilename;
    private $_outputpath;
    private $_outputfilename;
    private $_tempname;
    private $_temppath;
    private $_tempfolderlist;
    private $_failedrmdir;
    private $_istemplateready;
    private $_multicount;
    
    public $domDocument;
    

    public function __construct() {

        $this->multi = false;
        $this->_multicount = 0;
        $this->__resetvar();
    }

    public function __destruct() {
        
    }

    public function addPlaceholder($find, $replace) {

        $this->searchlist[$find] = $replace;
    }

    public function setTemplateFile($origindocx) {

        $this->_istemplateready = false;
        if ($origindocx)
            $this->templatefile = $origindocx;
        if (!$this->templatefile) {
            $this->error = 'Template file not defined.';
            return false;
        }
       
        if (!file_exists($this->templatefile)) {
            $this->error = 'Template file not found : '.$this->templatefile;
            return false;
        }
        $this->__verbose('+ Template file set to ' . $this->templatefile);
        return true;
    }

    public function setOutputFile($destinationdocx) {

        if ($destinationdocx)
            $this->outputfile = $destinationdocx;
        if (!$this->outputfile) {
            $this->error = 'Output file not defined.';
            return false;
        }
        $this->__verbose('+ Output file set to ' . $this->outputfile);
        return true;
    }

    public function createDocument() {

        return $this->__start();
    }

    public function createFromTemplate($origindocx, $destinationdocx) {

        if (!$this->setTemplateFile($origindocx))
            return false;
        if (!$this->setOutputFile($destinationdocx))
            return false;

        return $this->__start();
    }

    public function reset() {

        $this->multi = false;
        $this->_multicount = 0;
        $this->__cleartemp();
    }

    /*     * *
     *
     * 	private methods
     *
     * * */

    private function __resetvar() {

        if (!$this->multi) {
            $this->templatefile = '';
            $this->outputfile = '';
            $this->verbose = 0;
            $this->_failedrmdir = array();
            $this->debug = false;
            $this->_tempname = '';
        }
        $this->searchlist = array();
        $this->error = '';
        $this->_tempfolderlist = array();
        $this->_templatepath = '';
        $this->_templatefilename = '';
        $this->_outputpath = '';
        $this->_outputfilename = '';
        $this->_temppath;
    }

    private function __extractTemplate() {

        if ($this->_istemplateready) {
            $this->__verbose('+ Reuse existing defined template file');
            return true;
        }
        $this->__verbose('+ Extracting template file');
        $this->_zip = new ZipArchive();
        $res = $this->_zip->open($this->templatefile);
        if ($res != true) {
            $this->error = 'Template file loading error. ZipArchive error code: ' . $res;
            return false;
        }
        $this->_zip->extractTo($this->_outputpath . '/' . $this->_tempname);
        $this->_zip->close();
        $this->_istemplateready = true;
        return true;
    }

    private function __start() {

        if (!count($this->searchlist)) {
            $this->error = 'Placeholders array not defined.';
            return false;
        }

        $this->__settempvars();
        if (!$this->__extractTemplate())
            return false;

        $this->_zip = new ZipArchive();
        $res = $this->_zip->open($this->outputfile, ZIPARCHIVE::CREATE);
        if ($res != true) {
            $this->error = 'Output file (' . $this->outputfile . ') creation error: ZipArchive error code: ' . $res;
            return false;
        }
       
        $this->__getdir($this->_temppath);
        for ($j = 0; $j < count($this->_tempfolderlist); $j++) {
            $this->_zip->addFile($this->_tempfolderlist[$j]['source'], $this->_tempfolderlist[$j]['destination']);
        }
        $this->_zip->close();
        $this->__verbose('+ Output file (' . $this->outputfile . ') created');

        if (!$this->multi)
            $this->__cleartemp();
        $this->__resetvar();

        return true;
    }

    private function __settempvars() {

        $this->_templatepath = dirname($this->templatefile);
        $this->_templatepath = str_replace("\\", "/", $this->_templatepath);
        $this->_templatefile = basename($this->templatefile);
        $this->_outputpath = dirname($this->outputfile);
        $this->_outputpath = str_replace("\\", "/", $this->_outputpath);
        $this->_outputfile = basename($this->outputfile);
        if (($this->multi && !$this->_tempname) || !$this->multi) {
            $this->_tempname = uniqid();
            $this->_temppath = ($this->_outputpath . '/' . $this->_tempname . '/');
            $this->__verbose('- temporary path : ' . $this->_temppath, true);
        }
    }

    private function __cleartemp() {

        $this->__verbose('+ Remove temporary files');
        $this->__removedir($this->_temppath);
        if (count($this->_failedrmdir)) {
            $this->__verbose('+ Attempt #2 removing temporary files', true);
            foreach ($this->_failedrmdir as $key => $folder) {
                $this->__removedir($folder);
            }
        }
    }

    private function __verbose($str, $only_when_debug = false) {

        if ($this->verbose) {
            if ($only_when_debug && !$this->debug)
                return;
            print ($this->debug && $only_when_debug ? 'DEBUG: ' : '') . "$str<br/>";
        }
    }

    private function __removedir($dir) {

        $dh = opendir($dir);
        while ($file = readdir($dh)) {
            if ($file != '.' && $file != '..') {
                if (filetype($dir . $file) == 'dir') {
                    $this->__removedir($dir . $file . '/');
                } else {
                    $this->__verbose('- del ' . $dir . $file, true);
                    unlink($dir . $file);
                }
            }
        }
        $this->__verbose('- rmdir ' . $dir, true);
        $ok = rmdir($dir);
        if (!$ok) {
            $this->__verbose('# failed rmdir ' . $dir, true);
            $this->_failedrmdir[] = $dir;
        }
    }

    private function __getdir($dir) {

        $dh = opendir($dir);
        while ($file = readdir($dh)) {
            if ($file != '.' && $file != '..') {
                if (filetype($dir . $file) == 'dir') {
                    $this->__getdir($dir . $file . '/');
                } else {
                    if ($file == 'document.xml') {
                        $this->__parseFile($dir . $file);
                        $thisfile = $dir . $file;
                        $thisfile = str_replace($this->_temppath, '', $thisfile);
                        $this->_tempfolderlist[] = array('source' => $dir . $file . '.new' . ($this->_multicount), 'destination' => $thisfile);
                    } else {
                        if (substr($dir . $file, -4, 3) != 'new') {
                            $thisfile = $dir . $file;
                            $thisfile = str_replace($this->_temppath, '', $thisfile);
                            $this->_tempfolderlist[] = array('source' => $dir . $file, 'destination' => $thisfile);
                        }
                    }
                }
            }
        }
    }
    
    /* added 22/02/2015 */
    protected function filterLoopingFields($xmlContents){
        return $xmlContents;
    }
    
    



    private function __parseFile($thefile) {

        $this->_multicount++;
       
        $content = file_get_contents($thefile);

        
       
        $content = $this->filterLoopingFields($content); // added 22/02/2015

       
    
        foreach ($this->searchlist as $placeholder => $val) {
          //  var_dump($placeholder);
            /// check repeated field
           
            
            $content = str_replace("x".$placeholder."x", htmlspecialchars($val), $content);
        }
        
        $this->domDocument = $content;
        
        $newfile = $thefile . '.new' . ($this->_multicount);
        $fh = fopen($newfile, 'wb');
        fwrite($fh, $content);
        fclose($fh);
    }
    
    

    /*
      private function __parseFile($thefile) {

      $this->_multicount++;
      $content = file_get_contents($thefile);
      foreach($this->searchlist as $placeholder => $val) {
         
      $content = str_replace("\$$placeholder\$", htmlspecialchars($val), $content);
     
      }
      $newfile = $thefile.'.new'.($this->_multicount);
      $fh = fopen($newfile,'wb');
      fwrite($fh,$content);
      fclose($fh);
      }
     
     */
     
}

?>