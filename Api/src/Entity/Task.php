<?php

namespace App\Entity;

use App\Repository\TaskRepository;
use App\Traits\Hydrator;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=TaskRepository::class)
 */
class Task
{
    use Hydrator;
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups ("task:read")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups ("task:read")
     */
    private $title;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups ("task:read")
     */
    private $completion;

    /**
     * @ORM\Column(type="smallint", nullable=true)
     * @Groups ("task:read")
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="tasks")
     * @Groups ("task:read")
     */
    private $category;

    public function __construct($datas = [])
    {
        $this->hydrate($datas);
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getCompletion(): ?int
    {
        return $this->completion;
    }

    public function setCompletion(int $completion): self
    {
        $this->completion = $completion;

        return $this;
    }

    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(?int $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }
}
