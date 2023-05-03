<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManager;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AuthController extends AbstractController
{
    #[Route('/auth', methods: ['POST'])]
    public function Response(Request $request,EntityManagerInterface $entityManager): Response
    {
     $jwt=$request->headers->get('authorization');
     $token = explode(" ",$jwt);
$user = $entityManager->getRepository(User::class);
try {
    $jwt = $user->JWTdecode($token[1]);
      $response = new Response();
  $response->setStatusCode(200);
  $response->setContent(json_encode([
    'data' => [
        'jwt' => $jwt
    ],
]));
$response->headers->set('Content-Type', 'application/json');
return $response;
}catch (\Exception $e){
    $response = new Response();
  $response->setStatusCode(418);
  $response->setContent(json_encode([
    'data' => [
        'jwt' => 'token invalid'
    ],
]));
$response->headers->set('Content-Type', 'application/json');
return $response;
}

    }
}
