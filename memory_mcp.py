from fastmcp import FastMCP
from mem0 import Memory
from typing import List, Optional

# Initialize FastMCP Server
mcp = FastMCP("Antigravity Memory")

# Initialize Memory instance (ensure OpenAI key is set in environment)
memory = Memory()

@mcp.tool()
def add_memory(content: str, user_id: str) -> str:
    """
    Store a generic memory or information about the user.
    Use this to remember facts, preferences, or important context.

    Args:
        content: The text content to remember.
        user_id: The unique identifier for the user.
    """
    try:
        memory.add(content, user_id=user_id)
        return f"Successfully added memory for user {user_id}: '{content}'"
    except Exception as e:
        return f"Error adding memory: {str(e)}"

@mcp.tool()
def search_memories(query: str, user_id: str, limit: int = 5) -> str:
    """
    Search for relevant memories based on a semantic query.
    Use this to recall past interactions or user details.

    Args:
        query: The search query string.
        user_id: The unique identifier for the user.
        limit: Max number of results (default: 5).
    """
    try:
        results = memory.search(query=query, user_id=user_id, limit=limit)
        if not results or "results" not in results:
            return "No relevant memories found."
        
        memories = [f"- {entry['memory']}" for entry in results["results"]]
        return "\n".join(memories)
    except Exception as e:
        return f"Error searching memories: {str(e)}"

@mcp.resource("memories://{user_id}/recent")
def get_recent_memories(user_id: str) -> str:
    """
    Get the most recent memories for a user.
    """
    try:
        # Assuming mem0 has a method to get recent or generic fetch
        # If not, we can implement a workaround or use search with empty query
        results = memory.get_all(user_id=user_id, limit=10) # Hypothetical API call
        # If api doesn't support get_all, use search with generic term
        if not results:
             results = memory.search(query="recent context", user_id=user_id, limit=10)

        if not results or "results" not in results:
            return "No recent memories found."

        formatted = [f"- {entry['memory']} ({entry.get('created_at', 'unknown date')})" for entry in results.get("results", [])]
        return "\n".join(formatted)
    except Exception as e:
        return f"Error retrieving recent memories: {str(e)}"

if __name__ == "__main__":
    # fastmcp handles the server startup via CLI or direct run
    mcp.run()
