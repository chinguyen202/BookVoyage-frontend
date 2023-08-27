import { useNavigate } from 'react-router-dom';
import { withAdmin } from '../../../HOC';
import { Loading } from '../../../app/layout';
import { Category } from '../../../app/models';
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from '../api/categoryApi';
import { toast } from 'react-toastify';

const AllCategory = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetCategoriesQuery(null);
  const [deleteCategory] = useDeleteCategoryMutation();
  const handleDelete = (id: string) => () => {
    console.log('Clicked');
    toast.promise(deleteCategory(id), {
      pending: 'Deleting...',
      success: 'Deleted successfully',
      error: 'Error when deleting',
    });
  };
  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-item-center justify-content-between">
            <h1 className="text-dark">Category list</h1>
            <button
              className="btn btn-dark"
              onClick={() => navigate('/categories/upsert')}
            >
              Add new
            </button>
          </div>
          <div className="p-2">
            <div className="row border">
              <div className="col-3">Id</div>
              <div className="col-2">Name</div>
              <div className="col-2">Created Date</div>
              <div className="col-2">Modified Date</div>
              <div className="col-2">Action</div>
            </div>
            {data.map((category: Category, index: number) => (
              <div className="row border" key={index}>
                <div className="col-3">{category.id}</div>
                <div className="col-2">{category.name}</div>
                <div className="col-2">
                  {new Date(category.createdAt).toLocaleString()}
                </div>
                <div className="col-2">
                  {new Date(category.modifiedAt).toLocaleString()}
                </div>
                <div className="col-1">
                  <button className="btn btn-success">
                    <i
                      className="bi bi-pencil-fill"
                      onClick={() =>
                        navigate('/categories/upsert/' + category.id)
                      }
                    ></i>
                  </button>
                </div>
                <div className="col-1">
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => handleDelete(category.id)}
                  >
                    <i
                      className="bi bi-trash-fill"
                      onClick={() => handleDelete(category.id)}
                    ></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default withAdmin(AllCategory);