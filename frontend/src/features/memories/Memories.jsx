import React from "react";

const Memories = ({ userMemories }) => {
  console.log(userMemories);
  return (
    <div>
      memories
      <div>
        {userMemories.memories.length === 0 ? (
          <div>No memories</div>
        ) : (
          userMemories.memories.map((memory, index) => (
            <div key={index}>
              {memory.memory}
              {memory.categories}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Memories;
