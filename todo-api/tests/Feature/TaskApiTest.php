<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TaskApiTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
    public function test_user_can_create_task() {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->postJson('/api/tasks', [
            'title' => 'Test Task',
            'body' => 'Test body'
        ]);
    
        $response->assertStatus(201)
                 ->assertJsonFragment(['title' => 'Test Task']);
    }
}
