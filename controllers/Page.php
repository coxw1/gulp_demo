<?php 


/**
* 
*/

$Page = new Page;
if($Page->checkEnvironment('dev')) {
    $templatePath = $_SERVER['DOCUMENT_ROOT'] . '/src/templates';
} else {
    $templatePath = $_SERVER['DOCUMENT_ROOT'] . '/public/templates';
}

class Page {

    private function returnEnvironment() {
        $server = $_SERVER['SERVER_NAME'];
        $environment = strstr($server, '.', true);
        return $environment;
    }

    private function buildCssLink($path) {
        return '<link rel="stylesheet" type="text/css" href="'.$path.'" media="all" />';
    }

    private function buildJsLink($path) {
        return '<script type="text/javascript" src="'.$path.'"></script>';
    }

    private function buildScriptsLink($path, $fileType) {
        if($fileType == 'css') {
            return $this->buildCssLink($path);
        } elseif($fileType == 'js') {
            return $this->buildJsLink($path);
        }
    }

    private function filePaths($filePaths, $fileType) {        
        $returnedFiles = '';
        if(is_array($filePaths)) {            
            foreach ($filePaths as $path) {
                $returnedFiles = $returnedFiles . $this->buildScriptsLink($path, $fileType);
            }
        } else {
            $returnedFiles = $this->buildScriptsLink($filePaths, $fileType);
        }
        return $returnedFiles;
    }

    public function includeScripts($environment, $filePaths, $fileType) {
        if($this->returnEnvironment() === $environment) {
            return $this->filePaths($filePaths, $fileType);
        } elseif($this->returnEnvironment() === 'test' && $environment === 'prod') {
            return $this->filePaths($filePaths, $fileType);
        }
    }

}












