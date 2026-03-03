#!/usr/bin/env python3
"""
Antigravity Memory Agent
=======================

Integration of Mem0 memory with OpenAI for persistent context-aware conversations.
Follows Antigravity Kit Clean Code and Python Patterns.

Usage:
    python memory_agent.py --user-id "my-user" --model "gpt-4.1-nano-2025-04-14"
"""

import argparse
import logging
import sys
from typing import Dict, List, Optional, Any

try:
    from openai import OpenAI, OpenAIError
    from mem0 import Memory  # type: ignore
except ImportError as e:
    sys.exit(f"Error: Missing dependency. Please install required packages: {e}")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger("MemoryAgent")


class MemoryEnhancedAgent:
    """
     AI Agent with long-term memory capabilities using Mem0.
    """

    def __init__(self, model: str = "gpt-4.1-nano-2025-04-14"):
        """
        Initialize the agent with OpenAI client and Memory instance.

        Args:
            model: The OpenAI model identifier to use.
        """
        self.model = model
        try:
            self.client = OpenAI()
            self.memory = Memory()
            logger.info(f"Agent initialized with model: {self.model}")
        except Exception as e:
            logger.error(f"Failed to initialize clients: {e}")
            raise

    def retrieve_context(self, query: str, user_id: str, limit: int = 3) -> str:
        """
        Retrieve relevant memories for the given query.

        Args:
            query: The user's input message.
            user_id: The unique identifier for the user.
            limit: Maximum number of memories to retrieve.

        Returns:
            A formatted string of retrieved memories.
        """
        try:
            results = self.memory.search(query=query, user_id=user_id, limit=limit)
            if not results or "results" not in results:
                return "No previous memories found."
            
            memories = [f"- {entry['memory']}" for entry in results["results"]]
            return "\n".join(memories)
        except Exception as e:
            logger.warning(f"Failed to retrieve memories: {e}")
            return "Error retrieving memories."

    def generate_response(self, message: str, context: str) -> str:
        """
        Generate a response from the LLM based on message and context.

        Args:
            message: The user's input.
            context: Retrieved memory context.

        Returns:
            The assistant's response content.
        """
        system_prompt = (
            "You are a helpful AI assistant with long-term memory.\n"
            "Answer the user's question based on the query and the following memories:\n\n"
            f"User Memories:\n{context}"
        )

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": message}
        ]

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages # type: ignore
            )
            return response.choices[0].message.content or ""
        except OpenAIError as e:
            logger.error(f"OpenAI API error: {e}")
            return "I encountered an error generating a response."

    def save_interaction(self, user_input: str, assistant_response: str, user_id: str) -> None:
        """
        Save the interaction to memory.

        Args:
            user_input: The user's message.
            assistant_response: The AI's response.
            user_id: The user identifier.
        """
        try:
            messages = [
                {"role": "user", "content": user_input},
                {"role": "assistant", "content": assistant_response}
            ]
            self.memory.add(messages, user_id=user_id)
            logger.debug("Interaction saved to memory.")
        except Exception as e:
            logger.error(f"Failed to save memory: {e}")

    def chat(self, message: str, user_id: str = "default_user") -> str:
        """
        Main chat interface. Retrieves context, generates response, and saves memory.

        Args:
            message: User input.
            user_id: User identifier.

        Returns:
            Assistant response.
        """
        if not message.strip():
            return ""

        logger.info(f"Processing message from {user_id}: {message[:50]}...")
        
        # 1. Retrieve
        context = self.retrieve_context(message, user_id)
        
        # 2. Generate
        response = self.generate_response(message, context)
        
        # 3. Save
        self.save_interaction(message, response, user_id)
        
        return response


def main():
    parser = argparse.ArgumentParser(description="Run Memory-Enhanced AI Agent")
    parser.add_argument("--user-id", default="default_user", help="User ID for memory storage")
    parser.add_argument("--model", default="gpt-4.1-nano-2025-04-14", help="OpenAI Model ID")
    parser.add_argument("--debug", action="store_true", help="Enable debug logging")
    
    args = parser.parse_args()

    if args.debug:
        logger.setLevel(logging.DEBUG)

    try:
        agent = MemoryEnhancedAgent(model=args.model)
        print(f"🤖 Agent Ready (User: {args.user_id}) - Type 'exit' to quit.")
        
        while True:
            try:
                user_input = input(f"\nYou ({args.user_id}): ").strip()
                if user_input.lower() in ('exit', 'quit'):
                    print("Goodbye! 👋")
                    break
                
                if not user_input:
                    continue

                response = agent.chat(user_input, user_id=args.user_id)
                print(f"AI: {response}")

            except KeyboardInterrupt:
                print("\nExiting...")
                break
            except Exception as e:
                logger.error(f"Unexpected error in loop: {e}")

    except Exception as e:
        logger.critical(f"Fatal error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
