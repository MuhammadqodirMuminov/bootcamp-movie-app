import { ErrorMessage, FieldHookConfig } from "formik";
import { useField } from "formik";
import { TextFeildProps } from "./textfeild.props";

const TextFeild = ({ ...props }: TextFeildProps & FieldHookConfig<string>) => {
	const [feild, meta] = useField(props);


	return (
		<div className="w-full inline-block">
			<label
				className={`inline-block w-full ${
					meta.touched && meta.error && "border-2 border-red-500"
				}`}>
				<input {...props} className="input" {...feild} />
			</label>
			<p className="text-red-500">
				<ErrorMessage name={`${feild.name}`} />
			</p>
		</div>
	);
};

export default TextFeild;
