<?php 
namespace App\Controller;

// ...

use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class LoginController extends AbstractController
{
    private $userRepository;
    private $entityManager;

    public function __construct(UserRepository $userRepository, EntityManagerInterface $entityManager)
    {
        $this->userRepository = $userRepository;
        $this->entityManager = $entityManager;
    }

    #[Route('/login', methods: ['POST'])]
    public function Response(Request $request): Response
    {
        // j'appel mes données
      
        $email = $request->request->get('email');
        $password = $request->request->get('password');
      
        // je traite mes données
        $error = $this->userRepository->auth([
            'email' => $email,
            'password' => $password,
          
        ], []);

        // j'enregistre mes données
        $response = new Response();

        if ($error['error'] == true) {
            $response->setContent(json_encode([
                'data' => [
                    'titleError' => 'Une erreur est survenue',
                    'error' => $error['message']
                ],
            ]));
            $response->setStatusCode(409);
    
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }

        $response->setContent(json_encode([
            'data' => [
                'email' => $email,
                'jwt' => $error['jwt']
            ],
        ]));
        $response->setStatusCode(200);


        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}
