import { Modal } from "@/components/Modal";
import TodoTable from "@/components/TodoTable";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto mt-8">
      {/* Add Task Section */}
      <section>
        <Modal title="Add New Task" Adding={true}>
          <Button
            className="w-full bg-teal-600 text-white px-2 py-1 uppercase text-lg"
            variant="default"
          >
            Add Task
          </Button>
        </Modal>
      </section>
      {/* Todo Table Section */}
      <section className="mt-4">
        <TodoTable />
      </section>
    </main>
  );
}
