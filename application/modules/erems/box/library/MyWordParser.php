<?php

/**
 * Description of MyWordParser
 *
 * @author MIS
 */
class Erems_Box_Library_MyWordParser extends Erems_Box_Library_Phpmswordparser {

    private $srcFolder;
    private $dstFolder;
    private $data;
    private $url;
    public $useTable; /// boolean

    public function __construct($upperCase = FALSE) {
        parent::__construct();
        $this->srcFolder = 'app/erems/uploads/msword/';
        //  $this->dstFolder = 'app/erems/print/';
        $this->dstFolder = 'app/erems/printb/';
        $this->loopingFields = array();
    }

    public function setTemplateFile($origindocx) {
        $path = $this->srcFolder . '' . $origindocx;

        return parent::setTemplateFile($path);
    }

    public function setOutputFile($destinationdocx) {
        $filePath = $this->dstFolder . '' . $destinationdocx;
        $this->url = $filePath;
        return parent::setOutputFile($filePath);
    }

    public function getUrl() {

        return $this->url;
    }

    public function printDoc($origindocx, $destinationdocx, $data = NULL) {

        if (!$this->setTemplateFile($origindocx)) {
            return FALSE;
        }


        if (!$this->setOutputFile($destinationdocx)) {
            return FALSE;
        }
        if (is_array($data)) {
            foreach ($data as $k => $v) {

                $this->addPlaceholder($k, $v);
            }
        }
        $status = $this->createDocument();

        return $status;
    }

    public function addLoopingField($fields = array(), $amount) {

        if (count($fields) > 0) {
            $this->loopingFields[$fields[0]] = array($fields, $amount);
        }

        //   var_dump($this->loopingFields);
    }

    public function changeNodeValue($node, $name, $newValue) {
        for ($i = $node->childNodes->length; --$i >= 0;) {
            $elc = $node->childNodes->item($i);





            if ($elc->childNodes->length > 0) {
                $this->changeNodeValue($elc, $name, $newValue);
            }

            $pos = strpos($elc->nodeValue, $name);

            if ($pos > -1) {

                $elc->nodeValue = $newValue;
            }
        }
    }

    public function changeMulti($node, $names, $count) {
        foreach ($names as $name) {
            $this->changeNodeValue($node, 'x' . $name . 'x', 'x' . $name . '' . $count . 'x');
        }
    }

    /* check jika ada looping data, kalo tidak ada maka hapus barisnya */

    protected function filterLoopingFields($xmlContents) {

        if ($this->useTable == 2) {

            if (count($this->loopingFields) > 0) {

                $doc = new DOMDocument();
                $doc->loadXML($xmlContents);
                $x = $doc->documentElement;

                $registedLoop = array();
                for ($i = $x->childNodes->length; --$i >= 0;) {
                    $el = $x->childNodes->item($i);
                    for ($i = $el->childNodes->length; --$i >= 0;) {

                        $els = $el->childNodes->item($i);

                        for ($j = $els->childNodes->length; --$j >= 0;) {

                            $elt = $els->childNodes->item($j);

                            foreach ($this->loopingFields as $k => $v) {
                                $field = 'x' . $k . 'x';
                                $amount = $v[1];
                                $pos = strpos($elt->nodeValue, $field);
                                if ($pos && $amount > 2) {
                                    // $els->parentNode->removeChild($els);

                                    if (!key_exists($field, $registedLoop)) {



                                        $registedLoop[$field] = TRUE;
                                        $newNode = $elt->nextSibling;

                                        for ($z = 1; $z <= $amount - 2; $z++) {
                                            $clonenode = $elt->cloneNode(true);


                                            $hasil = $elt->parentNode->insertBefore($clonenode, $newNode);

                                            $newNode = $hasil->nextSibling;

                                            $this->changeMulti($hasil, $v[0], ($z + 2));
                                        }

                                        $this->changeMulti($elt, $v[0], 2);
                                    } else {

                                        //  $this->changeNodeValue($els,$field,'x' . $k . '1x');

                                        $this->changeMulti($elt, $v[0], 1);
                                    }
                                } else if ($pos && $amount == 2) {

                                    if (!key_exists($field, $registedLoop)) {
                                        $registedLoop[$field] = TRUE;
                                        $this->changeMulti($elt, $v[0], 2);
                                    } else {
                                        $this->changeMulti($elt, $v[0], 1);
                                    }
                                } else if ($pos && $amount == 1) {
                                    if (!key_exists($field, $registedLoop)) {
                                        $registedLoop[$field] = TRUE;
                                        $elt->parentNode->removeChild($elt);
                                    } else {
                                        $this->changeMulti($elt, $v[0], 1);
                                    }
                                } else if ($pos && $amount == 0) {
                                    $elt->parentNode->removeChild($elt);
                                }
                            }
                        }
                    }
                }



                $xmlContents = $doc->saveXML();
            }
        } else {
            if (count($this->loopingFields) > 0) {

                $doc = new DOMDocument();
                $doc->loadXML($xmlContents);
                $x = $doc->documentElement;

                $registedLoop = array();
                for ($i = $x->childNodes->length; --$i >= 0;) {
                    $el = $x->childNodes->item($i);
                    for ($i = $el->childNodes->length; --$i >= 0;) {

                        $els = $el->childNodes->item($i);
                        foreach ($this->loopingFields as $k => $v) {
                            $field = 'x' . $k . 'x';
                            $amount = $v[1];
                            $pos = strpos($els->nodeValue, $field);
                            if ($pos && $amount > 2) {
                                // $els->parentNode->removeChild($els);

                                if (!key_exists($field, $registedLoop)) {



                                    $registedLoop[$field] = TRUE;
                                    $newNode = $els->nextSibling;

                                    for ($z = 1; $z <= $amount - 2; $z++) {
                                        $clonenode = $els->cloneNode(true);


                                        $hasil = $els->parentNode->insertBefore($clonenode, $newNode);

                                        $newNode = $hasil->nextSibling;
                                        // $this->changeNodeValue($hasil,$field,'x' . $k.''.($z+2).'x');
                                        $this->changeMulti($hasil, $v[0], ($z + 2));
                                    }
                                    // $this->changeNodeValue($els,$field,'x' . $k . '2x');
                                    $this->changeMulti($els, $v[0], 2);
                                } else {

                                    //  $this->changeNodeValue($els,$field,'x' . $k . '1x');

                                    $this->changeMulti($els, $v[0], 1);
                                }
                            } else if ($pos && $amount == 2) {
                                if (!key_exists($field, $registedLoop)) {
                                    $registedLoop[$field] = TRUE;
                                    $this->changeMulti($els, $v[0], 2);
                                } else {
                                    $this->changeMulti($els, $v[0], 1);
                                }
                            } else if ($pos && $amount == 1) {
                                if (!key_exists($field, $registedLoop)) {
                                    $registedLoop[$field] = TRUE;
                                    $els->parentNode->removeChild($els);
                                } else {
                                    $this->changeMulti($els, $v[0], 1);
                                }
                            }
                        }
                    }
                }



                $xmlContents = $doc->saveXML();
            }
        }



        return $xmlContents;
    }

    /* added 20180525
     * return void */
    protected function filterFooter($xmlFileName, $fn) {
        $footerFn = str_replace("document.xml", $fn, $xmlFileName);
        if (file_exists($footerFn)) {
            $content = file_get_contents($footerFn);
            foreach ($this->searchlist as $placeholder => $val) {

                $content = str_replace("xf" . $placeholder . "xf", htmlspecialchars($val), $content);
            }
            
            file_put_contents($footerFn, $content);
         
        }

    }
    
    /* added 20180525
     * return void */
    protected function filterHeader($xmlFileName, $fn){
        $footerFn = str_replace("document.xml", $fn, $xmlFileName);
		
        if (file_exists($footerFn)) {
			$content = file_get_contents($footerFn);
			foreach ($this->searchlist as $placeholder => $val) {

                $content = str_replace("xh" . $placeholder . "xh", htmlspecialchars($val), $content);
            }
            
            file_put_contents($footerFn, $content);
         
        }

    }

}

?>
