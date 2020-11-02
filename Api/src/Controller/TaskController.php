<?php

namespace App\Controller;

use App\Entity\Task;
use App\Repository\TaskRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TaskController extends AbstractController
{
    /**
     * @Route("/tasks", name="task_list", methods={"GET"})
     */
    public function index(TaskRepository $taskRepository, Request $request): Response
    {
        $list = $taskRepository->findAll();

        return $this->json(
            $list,
            200,
            [
                'Access-Control-Allow-Origin' => '*',
                'Access-Control-Allow-Methods' => 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
                'Access-Control-Allow-Headers' => 'Content-Type'
            ]
        );
    }

    /**
     * @Route ("/tasks/create", name="task_create", methods={"POST"})
     */
    public function create(TaskRepository $taskRepository, Request $request) {

        $task = new Task;
        $form = $this->createForm(EntityType::class, $task);

        $form->handleRequest($request);

        if ($form->isSubmitted())
        {
           $task = $form->getData();

           $entityManager = $this->getDoctrine()->getManager();
           $entityManager->persist($task);
           $entityManager->flush();

           $this->addFlash(
               'success',
               'La tâche a bien été sauvegardée'
           );
        }

    }
}
