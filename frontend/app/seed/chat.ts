export type MessageType = {
    id: string;
    role: "user" | "assistant";
    content: string;
  };
  
  type Chat = {
    id: string;
    messages: MessageType[] ;
  };
  
  export const chats: Chat[] = [
    {
      id: "chat-1",
      messages: [
        { id: "m1", role: "user", content: "What is RAG?" },
        {
          id: "m2",
          role: "assistant",
          content:
            "RAG stands for Retrieval-Augmented Generation. It retrieves relevant documents at query time and feeds them into the model's prompt, so answers are grounded in external, up-to-date data instead of relying only on what the model learned during training.",
        },
      ],
    },
    {
      id: "chat-2",
      messages: [
        { id: "m3", role: "user", content: "Explain embeddings in simple terms." },
        {
          id: "m4",
          role: "assistant",
          content:
            "Embeddings are numeric representations of text (or images, audio, etc.) that capture meaning. Similar concepts end up close together in that numeric space, which lets a computer measure semantic similarity through math instead of exact word matching.",
        },
        { id: "m5", role: "user", content: "How are they generated?" },
        {
          id: "m6",
          role: "assistant",
          content:
            "A neural network (an embedding model) is trained to map text into vectors, typically hundreds or thousands of dimensions, positioning semantically related text closer together in that space.",
        },
      ],
    },
    {
      id: "chat-3",
      messages: [
        { id: "m7", role: "user", content: "How does RAG work end to end?" },
        {
          id: "m8",
          role: "assistant",
          content:
            "Query in, embed the query, search a vector database for the most relevant chunks, then pass those chunks plus the original query to the LLM as context so it generates a grounded answer.",
        },
      ],
    },
    {
      id: "chat-4",
      messages: [
        { id: "m9", role: "user", content: "What's chunking, and why does it matter?" },
        {
          id: "m10",
          role: "assistant",
          content:
            "Chunking splits large documents into smaller pieces before embedding them. Chunk size affects retrieval quality — too large and you dilute relevance, too small and you lose context.",
        },
      ],
    },
    {
      id: "chat-5",
      messages: [
        { id: "m11", role: "user", content: "Crypto agent: what's the current BTC trend?" },
        {
          id: "m12",
          role: "assistant",
          content:
            "I don't have live market access in this demo, but in a real implementation this agent would call a price-feed API and summarize recent trend data for you.",
        },
      ],
    },
    {
      id: "chat-6",
      messages: [
        { id: "m13", role: "user", content: "What data sources would a crypto agent typically use?" },
        {
          id: "m14",
          role: "assistant",
          content:
            "Common sources include exchange APIs (Binance, Coinbase) for price/volume, on-chain data providers (Glassnode, Dune), and news/sentiment feeds for qualitative signals.",
        },
      ],
    },
    {
      id: "chat-7",
      messages: [
        { id: "m15", role: "user", content: "CV Maker: how does AST parsing help here?" },
        {
          id: "m16",
          role: "assistant",
          content:
            "AST parsing lets the agent read and understand code structure programmatically — useful for extracting real project details (functions, classes, tech stack) to auto-populate a CV's project section accurately.",
        },
      ],
    },
    {
      id: "chat-8",
      messages: [
        { id: "m17", role: "user", content: "Can it detect which frameworks I used?" },
        {
          id: "m18",
          role: "assistant",
          content:
            "Yes — by parsing import statements and package manifests (package.json, requirements.txt), the agent can infer frameworks and libraries used across the codebase.",
        },
      ],
    },
    {
      id: "chat-9",
      messages: [
        { id: "m19", role: "user", content: "What's the difference between fine-tuning and prompting?" },
        {
          id: "m20",
          role: "assistant",
          content:
            "Prompting shapes model behavior at inference time through instructions and examples, with no weight changes. Fine-tuning updates the model's weights on a custom dataset, embedding the new behavior permanently into the model itself.",
        },
      ],
    },
    {
      id: "chat-10",
      messages: [{ id: "m19", role: "user", content: "What's the difference between fine-tuning and prompting?" },],
    },
    {
      id: "chat-11",
      messages: [{ id: "m19", role: "assistant", content: "What's the difference between fine-tuning and prompting?" },],
    },
    {
      id: "chat-10",
      messages: [{ id: "m19", role: "user", content: "What's the difference between fine-tuning and prompting?" },],
    },
    {
      id: "chat-11",
      messages: [{ id: "m19", role: "assistant", content: "What's the difference between fine-tuning and prompting?" },],
    },
  ];