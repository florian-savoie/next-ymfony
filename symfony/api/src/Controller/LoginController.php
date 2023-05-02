<?php 

// src/Controller/LoginController.php
namespace App\Controller;
use Symfony\Component\HttpFoundation\Response;

class LoginController
{
    #[Route('api/login_check', methods: ['POST'])]
    public function Response(): Response
    {
        $toto = 'Hello world';

        $response = new Response();
        $response->setContent(json_encode([
            'data' => $toto,
        ]));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}